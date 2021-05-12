/*
Looking for css selector div > span > css 
<div id="startNode">
    <div id="a" class="findMe">haha!
        <div>
            <div>
                <span><a>some stuff</a></span>
                <div>
                    <div id="a11111" class="findMe"></div>
                </div>
            </div>
        </div>
    </div>
</div>
*/

const root = document.getElementById("startNode");
const foundNodes = [];

const traverse = (node, ancestors) => {
  const { children: cIterator, tagName } = node;
  const children = [...cIterator];

  ancestors.push(tagName);
  const { length } = ancestors;
  if (
    ancestors[length - 1] === "A" &&
    ancestors[length - 2] === "SPAN" &&
    ancestors[length - 3] === "DIV"
  ) {
    console.log("in here");
    foundNodes.push(node.text);
  }
  if (!children.length) return;
  children.forEach((child) => traverse(child, [...ancestors]));
};

traverse(document.getElementById("startNode"), []);
console.log("found nodes", foundNodes);
// will output ["some stuff"]

          1
     0          1
  2    1      1   
1  2  3  4  5  
