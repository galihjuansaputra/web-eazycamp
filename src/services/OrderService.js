import axiosInstance from '@/api/axiosInstance';

const OrderService = () => {

    const getAll = async (query) => {
        const { data } = await axiosInstance.get(`/orders`, {params: query});
        return data;
    }

    return {
        getAll,
    }
}

export default OrderService;
