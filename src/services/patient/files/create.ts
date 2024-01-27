import { Api } from "@/lib/api-request";

interface IProp {
  data: Object;
  success: Function;
  error: Function;
  final: Function;
}

const patientFileCreate = ({ data, success, error, final }: IProp): void => {
  const formData = new FormData();
  formData.append("file", (data as any).file);
  formData.append("note", (data as any).note);
  Api.post("/patient/file/upload/" + (data as any).patientId, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => res?.data)
    .then(async (res) => {
      if (typeof res === "object") {
        return success(res);
      } else {
        return error();
      }
    })
    .catch((error) => {
      error(error);
    })
    .finally(async () => {
      final();
    });
};

export default patientFileCreate;
