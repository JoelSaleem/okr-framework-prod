import { ListTitle } from "./ListTitle";
import { ListContainer } from "./ListContainer";

interface ListItemProps {
  id: number;
  title: string;
  target: number;
  current: number;
  withHover?: boolean;
  onClick?: () => void;
}

export const KeyResultListItem: React.FC<ListItemProps> = ({
  id,
  title,
  current,
  target,
  withHover = false,
  onClick = () => {},
}) => {
  return (
    <ListContainer withHover={withHover} onClick={onClick}>
      <ListTitle>Title:</ListTitle> <span>{title}</span>
      <ListTitle>Progress</ListTitle>
      <span>
        {current} / {target}
      </span>
    </ListContainer>
  );
};
