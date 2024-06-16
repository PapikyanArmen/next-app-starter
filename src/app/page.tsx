// Home.tsx
"use client";
import { useEffect, useRef } from "react";
import { Button } from "@/app/components/Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchUsers, increment } from "@/lib/slices/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
export default function Home() {
  const { users, loading, value } = useAppSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useAppDispatch<AppDispatch>();
  console.log(loading, value, users);
  const hasFetched = useRef(false);
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  return (
    <main>
      <p>hello</p>
      <Button label="Click" onClick={() => dispatch(increment())} />
      <p>{value}</p>
      <hr />
      <ul>
        {users?.map((u) => {
          return <li key={u.id}>{u.name}</li>;
        })}
      </ul>
    </main>
  );
}
