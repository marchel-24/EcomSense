const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.getAllHistory = async(req, res) => {
    const {data, error} = await supabase
        .from('history_search')
        .select('*');

    
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
}

exports.sentChat = async (req, res) => {

    const {search_history, id_user} = req.body;

    const {data, error} = await supabase
        .from('history_search')
        .insert([{search_history, id_user}]);

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: 'Chat Terkirim', data });
}


exports.deleteChat = async (req, res) => {
    const {id} = req.body;
    const { data, error } = await supabase
        .from('history_search')
        .delete()
        .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json({ message: 'Chat Terhapus', data});
}