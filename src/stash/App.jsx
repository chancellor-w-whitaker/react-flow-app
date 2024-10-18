import { useConnections } from "../context/connections/useConnections";
import { DropdownButton } from "./components/DropdownButton";
import { ArcherExample } from "./components/ArcherExample";
import { DropdownMenu } from "./components/DropdownMenu";
import { DropdownItem } from "./components/DropdownItem";
import { Popover } from "./components/Popover";
import { Divider } from "./components/Divider";
import { Button } from "./components/Button";

export default function App() {
  const {
    representListPosition,
    onRootOptionClicked,
    updateListOrder,
    clickedTargetId,
    onClickConfirm,
    onTargetClick,
    listOptions,
    rootOptions,
    archerRoot,
    archerRows,
    listOrder,
    isRoot,
    root,
  } = useConnections();

  return (
    <main className="container small">
      <Divider>
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
      </Divider>
    </main>
  );
}
