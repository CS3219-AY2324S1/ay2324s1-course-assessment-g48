import React, { useEffect, useState } from "react";

function useProfile() {
  const [user, setUser] = useState<[]>([]);

  useEffect(() => {}, []);
  return { user, setUser };
}

export default useProfile;
