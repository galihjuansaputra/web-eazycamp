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

    const acceptOrder = async (id) => {
        const { data } = await axiosInstance.put(`/orders/${id}`);
        return data;
    }

    return {
        getAll,
        addOrder,
        acceptOrder
    }
}

export default OrderService;
