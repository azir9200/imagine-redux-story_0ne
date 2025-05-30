import { useGetSingleOrderQuery } from "../../redux/api/orderApi/orderApi";
import ManageTable from "../../redux/features/ManageTable";

const ManageOrder = () => {
  const { data, isLoading } = useGetSingleOrderQuery(undefined);
  // const[deleteOrder, { isLoading:deletedLoading, isSuccess, data:deletedData, isError, error }]=useDeleteOrderMutation()
  // const handleDelete = async(id:string) => {
  //     await deleteOrder(id);
  //   };
  //   const toastId = "orderProduct";
  //   useEffect(() => {
  //     if (deletedLoading) toast.loading("Processing ...", { id: toastId });

  //     if (isSuccess) {
  //       toast.success(deletedData?.message, { id: toastId });
  //     }

  //     if (isError) toast.error(JSON.stringify(error), { id: toastId });
  //   }, [deletedData?.data, deletedData?.message, error, isError, deletedLoading, isSuccess]);

  // Handle Update

  const columns = [
    { label: "Order ID", value: "_id" },
    { label: "User Email", value: "email" },
    { label: "Phone", value: "phone" },
    { label: "Price", value: "totalPrice" },
    { label: "Status", value: "status" },
    { label: "OrderDate", value: "createdAt" },

    { label: "Transaction ID", value: "transaction.id" },
  ];

  return (
    <div className=" m-6">
      <ManageTable
        data={data?.data}
        isvalue={"order"}
        columns={columns}
        loading={isLoading}
        // onDelete={handleDelete}
      />
    </div>
  );
};

export default ManageOrder;
