import type { MetaFunction } from "@remix-run/node";
import { Plus } from 'react-feather';
import {createDataService} from "../dataService"
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const dataServiceClient = await createDataService();
  // const todo  =dataServiceClient.createTodo({text: "Learn how to use Drizzle ORM"});
  const todos = await dataServiceClient.getTodos({page:1, pageSize:10});

  const data = {
    todos
  };
  return json(data);
};

import { ActionFunction, redirect } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const text = formData.get("text");
  console.log(`adding todo with text: `, text);
  if (typeof text !== "string" || text.trim() === "") {
    return json({ error: "Invalid input" }, { status: 400 });
  }

  const dataServiceClient = await createDataService();
  await dataServiceClient.createTodo({ text });

  const url = new URL(request.url);
  return redirect(url.pathname);
};

export default function Index() {
  const data = useLoaderData<typeof loader >();
  const { todos } = data;
  return (
    <div className="flex h-screen justify-center p-5">
      <div className="flex flex-col items-center gap-16">
        <header>
          <div className="text-1xl font-bold text-center text-gray-800 dark:text-gray-200 min-w-[280px]">
            <Form method="post" className="flex flex-row items-center border border-gray-300 rounded-md ">
              <input
              type="text"
              name="text"
              placeholder="item..."
              className="w-full rounded-l-md  p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              />
              <button
              type="submit"
              className="rounded-r-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
              <Plus />
              </button>
            </Form>
          </div>
        </header>
        <main className="flex flex-col justify-center gap-2 rounded-3xl border border-gray-200 p-6 dark:border-gray-700 min-w-[280px]">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            TODO
          </p>

          <ul>
            {todos.map(({ text }, idx) => (
              <li key={idx}>
          <span className="group flex items-center gap-3 self-stretch py-2 leading-normal">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
                <span>{text}</span>
          </span>
              </li>
            ))}
          </ul>

        </main>
      </div>
    </div>
  );
}


