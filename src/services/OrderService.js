import axiosInstance from '@/api/axiosInstance';

const OrderService = () => {

    const addOrder = async (payload) => {
        const {data} = await axiosInstance.post('/orders', payload)
        return data
    }

    const getAll = async (query) => {
        const { data } = await axiosInstance.get(`/orders`, {params: query});
        return data;
    }

    return {
        getAll,
        addOrder
    }
}

export default OrderService;
