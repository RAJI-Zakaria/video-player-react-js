import React from 'react';
import { Badge } from 'react-bootstrap';
import { Tag } from '../Types';

interface TagsListProps {
  tags: Tag[];
}

const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  return (
    <>
      {tags.map((tag, index) => (
        <a href={tag.url} target="_blank" key={index}>
          <Badge className="m-1 pe-auto" pill>
            {tag.title}
          </Badge>
        </a>
      ))}
      </>
  );
};

export default TagsList;
