import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

type OAuthButtonProps = {
  provider: string;
};

const OAuthButton: React.FC<OAuthButtonProps> = ({provider}) => {
  const handleOAuthSignIn = async () => {
    signIn(provider, { callbackUrl: "/" });
  }

  return (
    <>
      <div className="d-flex flex-column mt-3">
        <button
          className="btn btn-light border border-primary rounded-lg d-flex align-items-center justify-content-center py-2"
          onClick={handleOAuthSignIn}
        > 
          <div className="px-1">
            <Image src={`/${provider}.svg`} alt={provider} height={25} width={25} />
          </div>
          <p className="px-1 mb-0">{`Sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}</p>
        </button>
      </div>
    </>
  );
};
export default OAuthButton;
