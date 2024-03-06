import { useRouter } from "next/router";
import { useState } from "react";

export default function IndexPage() {
  const router = useRouter();

  const [data, setData] = useState("");
  const [cell, setCell] = useState("");

  const submit = async (data: string, cell: string) => {
    const res = await fetch(`/api/getAuthUrl?data=${data}`);
    const jsonRes = await res.json();
    router.push(jsonRes.writeResponse);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="data"
            >
              Data
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="data"
              type="text"
              placeholder="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cell"
            >
              Cell
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="cell"
              type="text"
              placeholder="cell"
              value={cell}
              onChange={(e) => setCell(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => submit(data, cell)}
            >
              Submit
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
}
