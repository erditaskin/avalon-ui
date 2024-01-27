import { Api } from "@/lib/api-request";

interface IProp {
  values: object;
  success: Function;
  error: Function;
  final: Function;
}

const patientCreate = ({ values, success, error, final }: IProp): void => {
  Api.post("/patient/create", values)
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
    .finally(() => {
      final();
    });
};

export default patientCreate;
