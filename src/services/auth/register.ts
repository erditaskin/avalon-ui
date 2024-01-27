import { Api } from "@/lib/api-request";

interface IProp {
  data: Object;
  success: Function;
  error: Function;
  final: Function;
}

const register = ({ data, success, error, final }: IProp): void => {
  Api.post("/auth/register", data)
    .then((res) => res?.data)
    .then(async (res) => {
      if (typeof res === "object") {
        return success(res);
      } else {
        return error(res);
      }
    })
    .catch((error) => {
      error(error);
    })
    .finally(async () => {
      final();
    });
};

export default register;
