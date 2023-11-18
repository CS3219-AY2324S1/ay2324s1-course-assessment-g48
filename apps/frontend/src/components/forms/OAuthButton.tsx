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
          className="flex w-full justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleOAuthSignIn}
        > 
          <div className="px-1">
            <Image src={`/${provider}.svg`} alt={provider} height={25} width={25} />
          </div>
          <p className="px-1 mb-0">{`Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}</p>
        </button>
      </div>
    </>
  );
};
export default OAuthButton;
