import { useEffect, useState } from "react";
import axios from "redaxios";

interface IUniversity {
  name: string;
  country: string;
  alpha_two_code: string;
  web_pages: string[];
}

export default function Root() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState<IUniversity[] | []>([]);

  useEffect(() => {
    if (query.length > 3) {
      setLoading(true);
      axios({
        method: "get",
        url: `https://universities.hipolabs.com/search?name=${query}`,
      })
        .then((res: any) => {
          setData(res?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center w-1/2 h-[500px] border border-gray-200 rounded-lg shadow-lg shadow-gray-100 hover:shadow-green-100 hover:border-green-500 ease-in-out duration-150">
        <input
          placeholder="Type university name..."
          value={query}
          onChange={({ target: { value } }) => setQuery(value)}
          className="m-5 px-5 py-2 text-lg border rounded-lg w-2/3 outline-none"
        />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="p-3 w-full h-full overflow-x-hidden overflow-y-scroll flex flex-col gap-4">
            {data.length > 0 &&
              data?.map((university, i: number) => (
                <div
                  key={i}
                  className="border rounded-lg p-2 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <h1>{university.name}</h1>
                    <h2>{university.country}</h2>
                  </div>
                  {university.web_pages.map((item) => (
                    <a
                      key={item}
                      href={item}
                      target="_blank"
                      className="underline"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
