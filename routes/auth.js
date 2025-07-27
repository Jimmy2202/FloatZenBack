import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import pool from "../config/db.js";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config();
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/history", async (req, res) => {
  const {
    user_id,
    music_name,
    artist_name,
    music_img,
    spotify_link,
    timestamp,
  } = req.body;

  console.log(music_name);

  try {
    await pool.query(
      "INSERT INTO history (user_id, music_name, artist_name, music_img, spotify_link, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, music_name, artist_name, music_img, spotify_link, timestamp]
    );
    res.status(200).json({ message: "Adicionado ao histórico!" });
  } catch (error) {
    console.error("Erro ao salvar no histórico: ", error);
    res.status(500).json({ error: "Erro ao salvar no histórico" });
  }
});

router.get("/history/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT music_name, artist_name, music_img, spotify_link, timestamp FROM history WHERE user_id = ? ORDER BY timestamp DESC",
      [id]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar histórico: ", error);
    res.status(500).json({ error: "Erro ao buscar histórico" });
  }
});

router.get("/history/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT music_name, artist_name, music_img, spotify_link, timestamp FROM history WHERE user_id = ? ORDER BY timestamp DESC",
      [id]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar histórico: ", error);
    res.status(500).json({ error: "Erro ao buscar histórico" });
  }
});

// Função para criar usuário com email de verificação
const createUser = async (email, password) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Email inválido" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyToken = crypto.randomBytes(32).toString("hex");

    const query = `
      INSERT INTO users (email, nickname, password, verified, verify_token)
      VALUES (?, ?, ?, false, ?)
    `;
    await pool.query(query, [email, "user", hashedPassword, verifyToken]);

    const [results] = await pool.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    if (results.length) {
      const id = results[0].id;
      await pool.query("UPDATE users SET nickname = ? WHERE id = ?", [
        `user_${id}`,
        id,
      ]);

      // Envia email de verificação
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verifique sua conta",
        html: `<a href="http://localhost:5000/api/auth/verify/${verifyToken}">Clique aqui para verificar sua conta</a>`,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return { success: false, error: "Usuário já existe" };
  }
};

// Verificação do email
router.get("/verify/:token", async (req, res) => {
  const { token } = req.params;
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE verify_token = ?",
    [token]
  );

  if (!rows.length) return res.status(400).send("Token inválido");

  await pool.query(
    "UPDATE users SET verified = true, verify_token = NULL WHERE id = ?",
    [rows[0].id]
  );
  res.redirect("http://localhost:5173/login?verified=true");
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  const result = await createUser(email, password);
  if (result.success) {
    res.json({
      success: true,
      message: "Verifique seu email para ativar a conta",
    });
  } else {
    res.status(400).json({ success: false, error: result.error });
  }
});

const loginUser = async (email, password) => {
  try {
    const [results] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (!results.length) {
      return { success: false, message: "Usuário não encontrado" };
    }

    const user = results[0];
    if (!user.verified) {
      return {
        success: false,
        message: "Conta não verificada. Verifique seu email.",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "Senha incorreta" };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, nick: user.nickname },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      success: true,
      token,
      user: { id: user.id, nickname: user.nickname, email: user.email },
    };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return { success: false, error: "Erro no login" };
  }
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  const result = await loginUser(email, password);
  if (result.success) {
    req.session.user = { info: result.token };
    res.json({ success: true, token: result.token, user: result.user });
  } else {
    res.status(400).json({ success: false, message: result.message });
  }
});

router.get("/session", async (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token não fornecido" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [user] = await pool.query(
      "SELECT id, nickname, email FROM users WHERE id = ?",
      [decoded.id]
    );

    if (!user.length)
      return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(user[0]);
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
});

// Rota de envio para recuperação de senha
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 3600000); // 1 hora

  await pool.query(
    "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
    [token, expiry, email]
  );

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Recuperação de Senha :)",
    html: `<a href="http://localhost:5173/reset/${token}">Clique aqui para redefinir sua senha</a>`,
  });

  res.json({ success: true, message: "Email de recuperação enviado!" });
});

// Rota para redefinir senha com token
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  const [rows] = await pool.query(
    "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()",
    [token]
  );

  if (!rows.length)
    return res.status(400).json({ error: "Token inválido ou expirado" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
    [hashedPassword, rows[0].id]
  );

  res.json({ success: true, message: "Senha atualizada com sucesso!" });
});

router.post("/feedback", async (req, res) => {
  const {
    user_id,
    music_name,
    artist_name,
    rating,
    emotion,
    comment,
    timestamp,
    type_selected,
  } = req.body;

  try {
    await pool.query(
      "INSERT INTO feedback (user_id, music_name, artist_name, rating, emotion, comment, timestamp, type_selected) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user_id,
        music_name,
        artist_name,
        rating,
        emotion,
        comment,
        timestamp,
        type_selected,
      ]
    );
    res.status(200).json({ message: "Feedback salvo com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar feedback:", error);
    res.status(500).json({ error: "Erro ao salvar feedback" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Erro ao encerrar sessão" });
    }
    res.json({ success: true, message: "Sessão encerrada com sucesso!" });
  });
});

export default router;
