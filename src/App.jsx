import { useConnections } from "./context/connections/useConnections";
import { DropdownButton } from "./components/DropdownButton";
// import { ArcherExample } from "./components/ArcherExample";
import { DropdownMenu } from "./components/DropdownMenu";
import { DropdownItem } from "./components/DropdownItem";
import { Popover } from "./components/Popover";
// import { Divider } from "./components/Divider";
// import { Button } from "./components/Button";
import FlowElkjs from "./FlowElkjs";

// click both nodes & confirm (how you had it previously)
// green lines (edges) & green dots where connected (black if not connected)
// make view adjust (reset key of tree) when width changes (width context)
// prevent dragging
// search box (search any id & shows which type item is & on click moves clicked type to front of order) (put back search on data page when reports > 12 or 11) (take search function from data page)
// default view: order--user, group, reports; root--random user or first user
// on click flow app doesn't cancel dropdown open

export default function App() {
  const {
    representListPosition,
    onRootOptionClicked,
    updateListOrder,
    listOptions,
    rootOptions,
    listOrder,
    isRoot,
    root,
  } = useConnections();

  const style = {
    paddingBottom: 12,
    height: "100vh",
    width: "100vw",
    paddingTop: 12,
  };

  return (
    <main className="container" style={style}>
      <div className="vstack h-100 gap-3">
        <div className="hstack gap-3">
          <Popover
            openUp={
              <DropdownMenu>
                {listOptions.map((option) => (
                  <li key={option}>
                    <DropdownItem onClick={() => updateListOrder(option)}>
                      {option} {representListPosition(option)}
                    </DropdownItem>
                  </li>
                ))}
              </DropdownMenu>
            }
            openWith={
              <DropdownButton>Order: {listOrder.join(", ")}</DropdownButton>
            }
          ></Popover>
          <Popover
            openUp={
              <DropdownMenu>
                {rootOptions.map((option) => (
                  <li key={option}>
                    <DropdownItem
                      className={isRoot(option) ? "active" : null}
                      onClick={() => onRootOptionClicked(option)}
                    >
                      {option}
                    </DropdownItem>
                  </li>
                ))}
              </DropdownMenu>
            }
            openWith={<DropdownButton>Root: {root}</DropdownButton>}
          ></Popover>
        </div>
        <div className="h-100">
          <FlowElkjs key={Math.random()}></FlowElkjs>
        </div>
      </div>
      {/* <Divider>
        <Popover
          openUp={
            <DropdownMenu>
              {listOptions.map((option) => (
                <li key={option}>
                  <DropdownItem onClick={() => updateListOrder(option)}>
                    {option} {representListPosition(option)}
                  </DropdownItem>
                </li>
              ))}
            </DropdownMenu>
          }
          openWith={
            <DropdownButton>Order: {listOrder.join(", ")}</DropdownButton>
          }
        ></Popover>
      </Divider>
      <Divider>
        <Popover
          openUp={
            <DropdownMenu>
              {rootOptions.map((option) => (
                <li key={option}>
                  <DropdownItem
                    className={isRoot(option) ? "active" : null}
                    onClick={() => onRootOptionClicked(option)}
                  >
                    {option}
                  </DropdownItem>
                </li>
              ))}
            </DropdownMenu>
          }
          openWith={<DropdownButton>Root: {root}</DropdownButton>}
        ></Popover>
      </Divider>
      <Divider>
        {listOrder.length > 0 && (
          <ArcherExample
            clickedTargetId={clickedTargetId}
            onTargetClick={onTargetClick}
            root={archerRoot}
            rows={archerRows}
          ></ArcherExample>
        )}
      </Divider>
      <Divider>
        <Button disabled={!clickedTargetId} onClick={onClickConfirm}>
          Confirm
        </Button>
      </Divider> */}
    </main>
  );
}
