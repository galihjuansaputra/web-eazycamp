import * as z from "zod";
import OrderService from "../../services/OrderService";
import LocationService from "../../services/LocationService";
import CustomerService from "../../services/CustomerService";
import GuideService from "../../services/GuideService";
import EquipmentService from "../../services/EquipmentService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import { useEffect } from "react";
import {
  IconArrowBadgeLeft,
  IconDeviceFloppy,
  IconX,
  IconArrowBadgeRight,
} from "@tabler/icons-react";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";

const createSchema = z.object({
  customer: z.string().min(1, "customer wajib di isi!"),
  guide: z.string().optional(),
  location: z.string().min(1, "lokasi wajib di isi!"),
  date: z.any(),
  day: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), "hari sewa harus berupa angka")
    .transform((val) => parseInt(val))
    .refine((val) => val >= 0, "hari sewa harus lebih dari 0"),
  orderType: z.string().min(1, "tipe order wajib di isi!"),
  paymentType: z.string().min(1, "tipe pembayaran wajib di isi!"),
  address: z.string().optional(),
  details: z.any(),
  image: z.any().refine((files) => {
    if (files.length === 0) return true;
    return ["image/png", "imgae/jpg", "image/jpeg"].includes(files[0].type);
  }, "format gambar tidak sesuai"),
});

export default function OrderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
    reset,
    setValue,
    trigger,
    getValues,
  } = useForm({ mode: "onChange", resolver: zodResolver(createSchema) });
  const orderService = useMemo(() => OrderService(), []);
  const locationService = useMemo(() => LocationService(), []);
  const customerService = useMemo(() => CustomerService(), []);
  const guideService = useMemo(() => GuideService(), []);
  const equipmentService = useMemo(() => EquipmentService(), []);

  const navigate = useNavigate();

  const [guides, setGuides] = useState([]);
  const [locations, setLocations] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [searchParam, setSearchParam] = useSearchParams();
  const [imageIndex, setImageIndex] = useState([]);
  const [store, setStore] = useState();
  const [eqCart, setEqCart] = useState([]);

  const handleChangeCart = (value) => {
    let cart = eqCart;
    let findCart = cart.findIndex((x) => x.equipmentId === value.equipmentId);
    if (findCart !== -1) {
      if (value.quantity === 0) cart.splice(findCart, 1);
      else cart.splice(findCart, 1, value);
    } else cart.push(value);
    setEqCart(cart);
    setValue(
      "details",
      eqCart.map((item) => {
        const newItem = { ...item };
        ["eqName", "eqPrice"].forEach((key) => delete newItem[key]);
        return newItem;
      })
    );
    trigger("details");
  };

  const [previewImage, setPreviewImage] = useState(
    "https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw"
  );

  const handleImageChange = (e) => {
    const { files } = e.target;
    const urlImage = URL.createObjectURL(files[0]);
    setPreviewImage(urlImage);
  };

  const search = searchParam.get("name") || "";
  const page = searchParam.get("page") || "1";
  const size = searchParam.get("size") || "5";
  const query = { name: search, page: page, size: size };

  const [paging, setPaging] = useState({
    page: page,
    size: size,
    totalElement: 0,
    totalPages: 1,
    hasPrevious: false,
    hasNext: false,
  });

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchParam({ name: value, page: "1", size: "10" });
  };

  const handleNextPage = () => {
    if (page >= paging.totalPages) return;
    setSearchParam({ name: search, page: +page + 1, size: size });
  };

  const handlePreviousPage = () => {
    if (+page === 1) return;
    setSearchParam({ name: search, page: +page - 1, size: size });
  };

  const navigatePage = (page) => {
    if (!page) return;
    setSearchParam({ name: search, page: page, size: size });
  };

  const { data } = useQuery({
    queryKey: ["equipments", query],
    queryFn: async () => {
      if (query.name === "") delete query.name;
      return await equipmentService.getAll(query);
    },
    onSuccess: (data) => {
      if (store !== data.data) {
        setStore(data.data);
        setPaging(data.paging);
        let a = [];
        for (let index = 0; index < data.data.length; index++) {
          a.push(0);
        }
        setImageIndex(a);
      }
    },
  });

  const fetchData = async () => {
    try {
      const customers = await customerService.getAll();
      setCustomers(customers.data);
      const guides = await guideService.getAll();
      setGuides(guides.data);
      const locations = await locationService.getAll();
      setLocations(locations.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    setValue("day", 1);
  }, []);

  const clearForm = () => {
    clearErrors();
    reset();
  };

  const onSubmit = async (data) => {
    try {
      const form = new FormData();
      let order = {
        customerId: data.customer,
        locationId: data.location,
        date: data.date,
        day: data.day,
        orderType: data.orderType,
        paymentType: data.paymentType,
      };
      if (data.details.length !== 0) order["orderEquipmentRequests"] = data.details
      if(data.guide) order["guideId"] = data.guide
      if(data.address) order["sentAddress"] = data.address
      form.append("order", JSON.stringify(order));
      form.append("guarantee", data.image[0]);
      const response = await orderService.addOrder(form);
      if (response && response.statusCode === 201) {
        clearForm();
        // showSuccessToast(response.message);
      }
      navigate("/dashboard/order");
    } catch (err) {
      console.log(err);
      //   showErrorToast(err);
    }
  };

  return (
    <div className="d-flex flex-lg-row flex-column">
      <div className="flex-fill p-3 pe-4 ps-0">
        <h2 className="mb-4">Browse Equipment</h2>
        <div className="shadow-sm rounded-2">
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div className="row">
              <div className="col-12">
                <select
                    className="form-select"
                    name="size"
                    id="size"
                    onChange={(e) => {
                      setSearchParam({
                        name: search,
                        page: page,
                        size: e.target.value,
                      });
                    }}
                >
                  <option value="10">10</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
            <form autoComplete="off">
              <input
                  {...register("search")}
                  placeholder="search"
                  className="form-control"
                  type="search"
                  name="search"
                  id="search"
                  onChange={handleSearch}
              />
            </form>
          </div>

          <hr/>
          <div className="table-responsive mt-4">
            <table className="table overflow-auto">
              <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Equipment</th>
              </tr>
              </thead>
              <tbody>
              {data &&
                  data.data.map((eq, index) => (
                      <tr key={eq.id}>
                        <td className="text-center">
                          {index + 1 + +size * (+page - 1)}
                        </td>
                        <td className="d-flex align-items-center justify-content-center">
                          <div>
                            <div className="border border p-2 d-flex align-items-center">
                              <button
                                  onClick={() => {
                                    if (imageIndex <= 0) return;
                                    let s = imageIndex.slice();
                                    s.splice(index, 1, imageIndex[index] - 1);
                                    setImageIndex(s);
                                  }}
                                  disabled={imageIndex[index] === 0}
                                  className="btn btn-outline-primary btn-sm"
                                  style={{height:42}}
                              >
                                <IconArrowBadgeLeft/>
                              </button>
                              <img
                                  className="img-fluid m-1"
                                  width={160}
                                  height={160}
                                  src={
                                      eq.images[imageIndex[index]] &&
                                      eq.images[imageIndex[index]].url
                                  }
                                  alt={
                                      eq.images[imageIndex[index]] &&
                                      eq.images[imageIndex[index]].url
                                  }
                              />
                              <button
                                  disabled={
                                      imageIndex[index] === eq.images.length - 1
                                  }
                                  onClick={() => {
                                    if (imageIndex[index] >= eq.images.length - 1)
                                      return;
                                    let s = imageIndex.slice();
                                    s.splice(index, 1, imageIndex[index] + 1);
                                    setImageIndex(s);
                                  }}
                                  className="btn btn-outline-primary btn-sm"
                                  style={{height:42}}
                              >
                                <IconArrowBadgeRight/>
                              </button>
                            </div>
                            <div className="justify-content-between mb-3 p-2 border bg-dark border-top-0 d-flex align-items-center">
                              <div>
                                <h6>{eq.name}</h6> <span>Rp. {eq.price}</span>
                              </div>
                              <div>
                                <Cart
                                    handleCart={(value) => {
                                      handleChangeCart({
                                        equipmentId: eq.id,
                                        eqName: eq.name,
                                        eqPrice: eq.price,
                                        quantity: value,
                                      });
                                    }}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex align-items-center justify-content-between mt-4">
            <small>
              Show data {data && data.data?.length} of {paging.totalElement}
            </small>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li
                    className={`page-item ${
                        !paging.hasPrevious ? "disabled" : ""
                    }`}
                >
                  <button
                      disabled={!paging.hasPrevious}
                      onClick={handlePreviousPage}
                      className="page-link"
                  >
                    Previous
                  </button>
                </li>
                {[...Array(paging.totalPages)].map((_, index) => {
                  const currentPage = index + 1;
                  return (
                      <li
                          key={index}
                          className={`page-item ${
                              paging.page === currentPage ? "active" : ""
                          }`}
                      >
                        <button
                            onClick={() => navigatePage(currentPage)}
                            className="page-link"
                        >
                          {currentPage}
                        </button>
                      </li>
                  );
                })}
                <li
                    className={`page-item ${!paging.hasNext ? "disabled" : ""}`}
                >
                  <button
                      disabled={!paging.hasNext}
                      className="page-link"
                      onClick={handleNextPage}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex-fill p-3 ps-0">
      <div>
          <div className="shadow-sm rounded-2">
            <h2 className="mb-4">Transaction Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="mb-3">
                <label htmlFor="date" className="form-label required">
                  Tanggal Transaksi Customer
                </label>
                <input
                  {...register("date")}
                  type="date"
                  className={`form-control ${errors.date && "is-invalid"}`}
                  id="date"
                  name="date"
                  required
                />
                {errors.date && (
                  <div className="invalid-feedback">{errors.date.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="customer" className="form-label required">
                  Customer
                </label>
                <select
                  {...register("customer")}
                  defaultValue={""}
                  id="customer"
                  className="form-select mb-3"
                  aria-label="Default select example"
                >
                  <option value="" disabled>
                    Pilih Customer
                  </option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label required">
                  Lokasi
                </label>
                <select
                  {...register("location")}
                  defaultValue={""}
                  id="location"
                  className="form-select mb-3"
                  aria-label="Default select example"
                >
                  <option value="" disabled>
                    Pilih Lokasi
                  </option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="guide" className="form-label">
                  Guide
                </label>
                <select
                  {...register("guide")}
                  defaultValue={""}
                  id="guide"
                  className="form-select mb-3"
                  aria-label="Default select example"
                >
                  <option value="">
                    Tanpa Guide
                  </option>
                  {guides.map((guide) => (
                    <option key={guide.id} value={guide.id}>
                      {guide.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="day" className="form-label required">
                  Hari Penyewaan
                </label>
                <input
                  {...register("day")}
                  type="number"
                  className={`form-control ${errors.day && "is-invalid"}`}
                  name="day"
                  id="day"
                />
                {errors.day && (
                  <div className="invalid-feedback">{errors.day.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="orderType" className="form-label required">
                  Tipe Order
                </label>
                <select
                  {...register("orderType")}
                  defaultValue={""}
                  className="form-select mb-3"
                  id="orderType"
                  aria-label="Default select example"
                  onChange={() => trigger("address")}
                >
                  <option value="" disabled>
                    Pilih Tipe Order
                  </option>
                  <option value="PICKUP">
                    Pickup/Ambil di Tempat Penyewaan
                  </option>
                  <option value="SENT">Sent/Kirim ke Alamat Customer</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="paymentType" className="form-label required">
                  Tipe Pembayaran
                </label>
                <select
                  {...register("paymentType")}
                  defaultValue={""}
                  id="paymentType"
                  className="form-select mb-3"
                  aria-label="Default select example"
                >
                  <option value="" disabled>
                    Pilih Tipe Pembayaran
                  </option>
                  <option value="TRANSFER">Transfer</option>
                  <option value="CASH">Cash</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Alamat Pengiriman (Untuk Tipe Order Sent)
                </label>
                <input
                  {...register("address")}
                  type="text"
                  className={`form-control ${errors.address && "is-invalid"}`}
                  name="address"
                  id="address"
                  autoComplete="off"
                />
                {errors.address && (
                  <div className="invalid-feedback">
                    {errors.address.message}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <span className="required">Foto Jaminan</span>
                  <br />
                  <img
                    className="img-thumbnail img-fluid"
                    width={200}
                    height={200}
                    src={previewImage}
                    alt="product"
                  />
                </label>
                <input
                  {...register("image", {
                    onChange: handleImageChange,
                  })}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className={`form-control ${errors.image && "is-invalid"}`}
                  name="image"
                  id="image"
                />
                {errors.image && (
                  <div className="invalid-feedback">{errors.image.message}</div>
                )}
              </div>

              <div className="table-responsive mt-4">
                <table className="table overflow-auto">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Menu ({getValues("day")} hari)</th>
                      <th>Quantity</th>
                      <th>SubTotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eqCart.map((cart, index) => (
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{cart.eqName}</td>
                        <td>{cart.quantity}</td>
                        <td>
                          Rp.{" "}
                          {cart.eqPrice * cart.quantity * getValues("day")}
                        </td>
                      </tr>
                    ))}
                    {eqCart.length !== 0 && (
                      <tr>
                        <td colSpan="3" className="text-start">
                          <b>GrandTotal</b>
                        </td>
                        <td>
                          Rp.{" "}
                          {eqCart.reduce(
                            (sum, detail) =>
                              sum +
                              detail.quantity *
                                detail.eqPrice *
                                getValues("day"),
                            0
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="modal fade" id="submitModal" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5">
                        Konfirmasi Submit Transaksi
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Apakah data transaksi yang dimasukkan sudah benar?
                    </div>
                    <div className="modal-footer">
                      <button
                          type="submit"
                          className="btn btn-success text-white"
                          data-bs-dismiss="modal"
                      >
                        <b>Simpan</b>
                      </button>

                      <button
                          type="button"
                          className="btn btn-danger text-white"
                          data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                    type="button"
                    disabled={!isValid}
                    className="d-flex align-items-center btn btn-success text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#submitModal"
                >
                  <i className="me-1">
                    <IconDeviceFloppy />
                  </i>
                  Simpan
                </button>
                <button
                  onClick={clearForm}
                  type="button"
                  className="d-flex align-items-center btn btn-danger text-white"
                >
                  <i className="me-1">
                    <IconX />
                  </i>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
