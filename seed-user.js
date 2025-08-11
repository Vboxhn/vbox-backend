// vbox-backend/seed-user.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const User = require('./models/User');

(async () => {
  try {
    const email = 'demo@vbox.com';
    const password = '12345678';

    let u = await User.findOne({ email });
    if (!u) {
      const hashed = await bcrypt.hash(password, 10);
      u = await User.create({
        nombre: 'Demo',
        apellido: 'VBOX',
        telefono: '00000000',
        email,
        password: hashed,
      });
    }
    console.log('✅ Usuario listo:');
    console.log('Email:', email);
    console.log('Pass :', password);
  } catch (e) {
    console.error('❌ Error seed:', e.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();
