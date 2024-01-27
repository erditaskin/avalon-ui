import { Api } from "@/lib/api-request";

interface IProp {
  data: Object;
  success: Function;
  error: Function;
  final: Function;
}

const profile = ({ data, success, error, final }: IProp): void => {
  const formData = new FormData();
  formData.append("image", (data as any).avatar);
  Api.put("/account/profile", formData, {
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

export default profile;
