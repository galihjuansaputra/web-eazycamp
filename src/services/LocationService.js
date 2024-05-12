import axiosInstance from '@/api/axiosInstance';

const LocationService = () => {
    const create = async (payload) => {
        const { data } = await axiosInstance.post('/locations', payload);
        return data;
    }

    const getAll = async (query) => {
        const { data } = await axiosInstance.get(`/locations`, {params: query});
        return data;
    }

    const getById = async (id) => {
        const { data } = await axiosInstance.get(`/locations/${id}`);
        return data;
    }

    const update = async (payload) => {
        const { data } = await axiosInstance.put('/locations', payload);
        return data;
    }


    return {
        create,
        getById,
        update,
        getAll,
    }
}

export default LocationService;
