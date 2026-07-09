"use client";

import { putInBasket } from "@/services/tour";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

function ReserveButton({ path, children, id }) {
  const router = useRouter();
  const { mutate, isPending } = useMutation({ mutationFn: putInBasket });

  const clickHandler = () => {
    mutate(
      { id },
      {
        onSuccess: (data) => {
          toast.success(`${data.res.data.res.message}`);
          console.log(data.res.data.res.message);
          router.push(path);
        },
        onError: (error) => {
          const status = error?.response?.status;
          const data = error?.response?.data;

          if (status === 401 && data?.isLoggedIn === false) {
            console.log(data);
            router.push("?modal=login");
            toast.error(
              "برای رزرو و خرید این تور باید ابتدا وارد حساب کاربری خود شوید !",
            );
            return;
          }

          toast.error("لطفا بعد از چند دقیقه دوباره تلاش کنید");
        },
      },
    );
  };

  return (
    <button onClick={clickHandler} disabled={isPending}>
      {children}
    </button>
  );
}

export default ReserveButton;
