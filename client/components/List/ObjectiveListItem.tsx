import { ListTitle } from "./ListTitle";
import { ListContainer } from "./ListContainer";

interface ListItemProps {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  withHover?: boolean;
  onClick?: () => void;
}

export const ObjectiveListItem: React.FC<ListItemProps> = ({
  id,
  title,
  description,
  createdAt,
  withHover = false,
  onClick = () => {},
}) => {
  return (
    <ListContainer key={id} withHover={withHover} onClick={onClick}>
      <ListTitle>Title:</ListTitle> <span>{title}</span>
      <ListTitle>Description:</ListTitle> <span>{description}</span>
    </ListContainer>
  );
};
