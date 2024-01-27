import { Api } from "@/lib/api-request";

interface IProp {
  success: Function;
  error: Function;
}

const check = ({ success, error }: IProp): void => {
  Api.get("/auth/me")
    .then((res) => res?.data)
    .then(async (res) => {
      if (typeof res?.user !== "undefined") {
        return success(res);
      } else {
        return error();
      }
    })
    .catch((error) => {
      error();
    });
};

export default check;
