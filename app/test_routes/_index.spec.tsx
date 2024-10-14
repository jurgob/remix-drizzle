import { json } from "@remix-run/node";
import { createRemixStub } from "@remix-run/testing";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {test} from "vitest";
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

  await waitFor(() => screen.findByText("TODO"));
});