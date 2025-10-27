import React from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { 
  DatePicker, 
  Field, 
  FieldLabel, 
  FieldHint, 
  FieldError,
  Box,
  Typography 
} from '@strapi/design-system';

const EditViewRightLinks = () => {
  const { 
    modifiedData, 
    onChange, 
    layout 
  } = useCMEditViewDataManager();

  // Get the current publish_date value
  const publishDate = modifiedData?.publish_date;

  // Handle publish_date field change
  const handlePublishDateChange = (value) => {
    onChange({
      target: {
        name: 'publish_date',
        value: value ? new Date(value).toISOString().split('T')[0] : null,
        type: 'date'
      }
    });
  };

  // Only show for blog-post content type
  if (layout?.uid !== 'api::blog-post.blog-post') {
    return null;
  }

  return (
    <>
      <Box 
        background="neutral0" 
        hasRadius 
        shadow="filterShadow" 
        paddingTop={4} 
        paddingBottom={4} 
        paddingLeft={4} 
        paddingRight={4}
        marginBottom={3}
      >
        <Field name="publish_date">
          <FieldLabel>
            Publish Date
          </FieldLabel>
          
          <DatePicker
            clearLabel="Clear publish date"
            ariaLabel="Publish Date"
            name="publish_date"
            onChange={handlePublishDateChange}
            onClear={() => handlePublishDateChange(null)}
            value={publishDate ? new Date(publishDate) : null}
            size="S"
          />
          
          <FieldHint>
            Custom publication date for display
          </FieldHint>
          
          <FieldError />
        </Field>
      </Box>
    </>
  );
};

export default EditViewRightLinks;
