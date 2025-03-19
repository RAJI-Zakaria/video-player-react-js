import React, { useState, useEffect, useRef } from 'react';
import TagsList from './TagsList';
import {Tag, Keywords} from '../Types'



interface TagsProps {
  keywords: Keywords[];
  currentTimelinePos: number;
}

const areTagsEqual = (tags1: Tag[], tags2: Tag[]): boolean => {
  // Compare tags using a custom equality check
  return JSON.stringify(tags1) === JSON.stringify(tags2);
};

const Tags: React.FC<TagsProps> = ({ keywords, currentTimelinePos }) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const prevSelectedTags = useRef<Tag[]>([]);

  useEffect(() => {
    const activeKeywords = keywords.find(
      (keyword, index) =>
        currentTimelinePos >= keyword.pos &&
        (index === keywords.length - 1 || currentTimelinePos < keywords[index + 1].pos)
    );

    
    if (activeKeywords) {
      if (!areTagsEqual(selectedTags, activeKeywords.data)) {
        setSelectedTags(activeKeywords.data);
      }
    } else {
      setSelectedTags([]);
    }

    

    // Update the previous selected tags
    prevSelectedTags.current = selectedTags;
  }, [keywords, currentTimelinePos, selectedTags]);




  return (
    <div className='mt-4'>
      <span className='text-white'>Tags : </span>
      <TagsList tags={selectedTags} />
    </div>
  );
};

export default Tags;
