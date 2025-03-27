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

exports.getUserAccount = async (req, res) => {
    const {id} = req.body;
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });

    res.status(200).json(data);
}

exports.updatePasswrd = async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    if (!newPassword) {
        return res.status(400).json({ error: "Password harus diisi" });
    }

    // Debugging: cek apakah ID ada di database sebelum update
    const { data: existingUser, error: findError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (findError || !existingUser) {
        return res.status(404).json({ error: "User tidak ditemukan" });
    }

    const { data, error } = await supabase
        .from('users')
        .update({ password: newPassword })
        .eq('id', userId)
        .select(); // Pakai .select() agar data yang diperbarui dikembalikan

    if (error) return res.status(500).json({ error: error.message });

    res.status(200).json({ message: "Password berhasil diperbarui", data });
};
