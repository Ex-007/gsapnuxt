import { defineStore } from 'pinia';


export const useSupabaseTest = defineStore('supa', () => {
    const isLoading = ref(false)
    const error = ref(null)


    const fetchALL = async () => {
        const {$supabase} = useNuxtApp()
        isLoading.value = true
        error.value = null
        try {
            const {data, error} = await $supabase
            .from('tasks')
            .select('*')

            if(error) throw error

            console.log(data)
        } catch (err) {
            console.log(err.message)
        }
    }

    return{
        isLoading,
        error,
        fetchALL
    }
})