import { Api } from "@/lib/api-request";

interface IProp {
  id: number;
  success: Function;
  error: Function;
}

const patientDelete = ({ id, success, error }: IProp): void => {
  Api.delete(`/patient/delete/${id}`)
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
    });
};

export default patientDelete;
