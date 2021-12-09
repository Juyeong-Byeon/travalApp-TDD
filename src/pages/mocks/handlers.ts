import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:5000/products", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "America",
          imagePath: "/images/America.jpeg",
        },
        {
          name: "England",
          imagePath: "/images/England.jpeg",
        },
      ])
    );
  }),
  rest.get("http://localhost:5000/options", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "Dinner",
        },
        {
          name: "Insurance",
        },
      ])
    );
  }),
];
