import { Api } from "@/lib/api-request";

interface IProp {
  values: object | any;
  success: Function;
  error: Function;
  final: Function;
}

const patientUpdate = ({ values, success, error, final }: IProp): void => {
  Api.put(`/patient/update/${values?.id}`, values)
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

export default patientUpdate;
