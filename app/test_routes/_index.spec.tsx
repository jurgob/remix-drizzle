import { createRemixStub } from "@remix-run/testing";
import {
  render,
  screen,
} from "@testing-library/react";
import {test,expect} from "vitest";
import IndexPage, {loader, meta, action} from "../routes/_index";

test("initial render works as expected", async () => {
  const RemixStub = createRemixStub([
    {
      path: "/",
      Component: IndexPage,
        loader,
        meta,
        action
    },
  ]);

  render(<RemixStub />);
    const todoTitle =  await screen.findByText("TODO");
    expect(todoTitle).toBeInTheDocument()
    const newTodoTextInput =  await screen.findByPlaceholderText<HTMLInputElement>("Add a new todo");
    expect(newTodoTextInput ).toBeInTheDocument();
    expect(newTodoTextInput.value).toBe('') // empty before

    
});

test("create a todo", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: IndexPage,
          loader,
          meta,
          action
      },
    ]);
  
    render(<RemixStub />);
     
  
      const newTodoTextInput =  await screen.findByPlaceholderText("Add a new todo");
      expect(newTodoTextInput ).toBeInTheDocument();
      
  });