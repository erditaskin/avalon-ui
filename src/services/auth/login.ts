import { Api } from "@/lib/api-request";

interface IProp {
  values: {
    email: string;
    password: string;
  };
  success: Function;
  error: Function;
  final: Function;
}

const login = ({ values, success, error, final }: IProp): void => {
  Api.post("/auth/login", values)
    .then((res) => res?.data)
    .then(async (res) => {
      if (typeof res?.token !== "undefined") {
        success(res);
      } else {
        error();
      }
    })
    .catch((error) => {
      error();
    })
    .finally(async () => {
      final();
    });
};

export default login;
