import supabase from './supabaseClient';

export const fetchEvents = async () => {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)

    if (error) throw error;
    return data;
};

export const addEvent = async (eventData) => {
    const { data, error } = await supabase
        .from('events')
        .insert([eventData]);

    if (error) throw error;
    if (!data || data.length === 0) {
        console.warn("empty data");
    } else {
        return data[0].id;
    }
};




export const fetchEventById = async (id) => {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};