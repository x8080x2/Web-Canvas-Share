import { useMutation } from "@tanstack/react-query";
import { api, type ApplicationInput } from "@shared/routes";

export function useCreateApplication() {
  return useMutation({
    mutationFn: async (data: ApplicationInput) => {
      const res = await fetch(api.applications.create.path, {
        method: api.applications.create.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        let errorMessage = "Failed to submit application";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Keep default error message if json parsing fails
        }
        throw new Error(errorMessage);
      }

      const responseData = await res.json();
      return api.applications.create.responses[201].parse(responseData);
    },
  });
}
