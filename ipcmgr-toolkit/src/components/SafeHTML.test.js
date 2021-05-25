import { htmlTreeToString, parseHtml } from "./SafeHTML";
// <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
const HTML = `<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
<title>
Thank you
</title>
</head>
<body style="background-color: #fff; margin:0;">
<table align="left" border="0" cellspacing="0" cellpadding="0" width="621" style="background: #ffffff;">
<tr>
<td>
<table>
<tr>
<td align="right" width="239">
Thank You
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;

const HTML_AST = {
  children: [
    " ",
    " ",
    " ",
    {
      name: "table",
      attrs: {
        align: "left",
        border: "0",
        cellpadding: "0",
        cellspacing: "0",
        style: "background: #ffffff;",
        width: "621"
      },
      children: [
        " ",
        {
          name: "tr",
          children: [
            " ",
            {
              name: "td",
              children: [
                " ",
                {
                  name: "table",
                  children: [
                    " ",
                    {
                      name: "tr",
                      children: [
                        " ",
                        {
                          name: "td",
                          attrs: {
                            align: "right",
                            width: "239"
                          },
                          children: [" Thank You "]
                        },
                        " "
                      ]
                    },
                    " "
                  ]
                },
                " "
              ]
            },
            " "
          ]
        },
        " "
      ]
    },
    " ",
    " "
  ]
};

describe("parseHtml", () => {
  it("turns an HTML string into an AST", () => {
    expect(parseHtml(HTML)).toEqual(HTML_AST);
  });
});

describe("htmlTreeToString", () => {
  it("turns an HTML ast from parseHtml back into a string", () => {
    expect(htmlTreeToString(HTML_AST)).toBe(
      '   <table align="left" border="0" cellpadding="0" cellspacing="0" style="background: #ffffff;" width="621"> <tr> <td> <table> <tr> <td align="right" width="239"> Thank You </td> </tr> </table> </td> </tr> </table>  '
    );
  });
});
