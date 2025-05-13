// types/global.d.ts
export {};

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: string;
              size?: string;
              width?: number;
              text?: string;
              shape?: string;
              logo_alignment?: string;
            }
          ) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }

  interface GoogleCredentialResponse {
    credential: string;
    select_by: string;
    clientId: string;
  }
}
