const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Create Account
exports.createAccount = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    const { data, error } = await supabase
        .from('users')
        .insert([{ username, email, password }]);

    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json({ message: 'Akun berhasil dibuat', data });
};

// Get All Accounts
exports.getAccounts = async (req, res) => {
    const { data, error } = await supabase
        .from('users')
        .select('*');

    if (error) return res.status(500).json({ error: error.message });

    res.status(200).json(data);
};
