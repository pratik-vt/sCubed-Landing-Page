import type { Schema, Struct } from '@strapi/strapi';

export interface BlogModuleAudio extends Struct.ComponentSchema {
  collectionName: 'components_blog_module_audios';
  info: {
    description: 'Audio player with podcast-style metadata and transcript support';
    displayName: 'ModuleAudio';
  };
  attributes: {
    audio_description: Schema.Attribute.Text;
    audio_file: Schema.Attribute.Media<'audios'> & Schema.Attribute.Required;
    audio_title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    autoplay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    cover_artwork: Schema.Attribute.Media<'images'>;
    duration: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 10;
      }>;
    loop: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    player_style: Schema.Attribute.Enumeration<
      ['minimal', 'standard', 'featured']
    > &
      Schema.Attribute.DefaultTo<'standard'>;
    podcast_episode: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    show_download: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    transcript: Schema.Attribute.RichText;
  };
}

export interface BlogModuleImage extends Struct.ComponentSchema {
  collectionName: 'components_blog_module_images';
  info: {
    description: 'Image content block with styling and link options';
    displayName: 'ModuleImage';
  };
  attributes: {
    alt_text: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    border_style: Schema.Attribute.Enumeration<
      ['none', 'rounded', 'circle', 'shadow']
    > &
      Schema.Attribute.DefaultTo<'rounded'>;
    caption: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    clickable: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    image_alignment: Schema.Attribute.Enumeration<['left', 'center', 'right']> &
      Schema.Attribute.DefaultTo<'center'>;
    image_size: Schema.Attribute.Enumeration<
      ['thumbnail', 'medium', 'large', 'full-width']
    > &
      Schema.Attribute.DefaultTo<'large'>;
    link_url: Schema.Attribute.String;
  };
}

export interface BlogModuleQuote extends Struct.ComponentSchema {
  collectionName: 'components_blog_module_quotes';
  info: {
    description: 'Quote content block with author attribution';
    displayName: 'ModuleQuote';
  };
  attributes: {
    author_company: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    author_name: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    author_photo: Schema.Attribute.Media<'images'>;
    author_position: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    quote_size: Schema.Attribute.Enumeration<['normal', 'large', 'featured']> &
      Schema.Attribute.DefaultTo<'normal'>;
    quote_style: Schema.Attribute.Enumeration<
      ['default', 'highlighted', 'callout', 'testimonial']
    > &
      Schema.Attribute.DefaultTo<'default'>;
    quote_text: Schema.Attribute.Text & Schema.Attribute.Required;
    show_quote_marks: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface BlogModuleYoutube extends Struct.ComponentSchema {
  collectionName: 'components_blog_module_youtubes';
  info: {
    description: 'YouTube video embed with customization options';
    displayName: 'ModuleYoutube';
  };
  attributes: {
    aspect_ratio: Schema.Attribute.Enumeration<['16:9', '4:3', '1:1']> &
      Schema.Attribute.DefaultTo<'16:9'>;
    autoplay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    custom_thumbnail: Schema.Attribute.Media<'images'>;
    player_size: Schema.Attribute.Enumeration<
      ['small', 'medium', 'large', 'full-width']
    > &
      Schema.Attribute.DefaultTo<'large'>;
    privacy_mode: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    show_controls: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    start_time: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    video_description: Schema.Attribute.Text;
    video_id: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    video_title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
  };
}

export interface BlogTextModule extends Struct.ComponentSchema {
  collectionName: 'components_blog_text_modules';
  info: {
    description: 'Rich text content block with styling options';
    displayName: 'TextModule';
  };
  attributes: {
    background_style: Schema.Attribute.Enumeration<
      ['none', 'light', 'primary', 'accent']
    > &
      Schema.Attribute.DefaultTo<'none'>;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    spacing: Schema.Attribute.Enumeration<['compact', 'normal', 'spacious']> &
      Schema.Attribute.DefaultTo<'normal'>;
    text_alignment: Schema.Attribute.Enumeration<
      ['left', 'center', 'right', 'justify']
    > &
      Schema.Attribute.DefaultTo<'left'>;
    text_size: Schema.Attribute.Enumeration<['small', 'normal', 'large']> &
      Schema.Attribute.DefaultTo<'normal'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blog.module-audio': BlogModuleAudio;
      'blog.module-image': BlogModuleImage;
      'blog.module-quote': BlogModuleQuote;
      'blog.module-youtube': BlogModuleYoutube;
      'blog.text-module': BlogTextModule;
    }
  }
}
