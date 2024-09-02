import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export function listener(insertCallback, deleteCallback) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (data) => {
            console.log('dataInsert', data);
            insertCallback(data.new);
        })
        .on('DELETE', (data) => {
            console.log('dataDelete', data);
            deleteCallback(data.old);
        })
        .subscribe();
}