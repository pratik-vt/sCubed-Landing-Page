declare module '@mailchimp/mailchimp_marketing' {
  interface Config {
    apiKey: string;
    server: string;
  }

  interface MergeFields {
    [key: string]: any;
    SOURCE?: string;
  }

  interface ListMember {
    email_address: string;
    status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending' | 'transactional';
    merge_fields?: MergeFields;
    tags?: string[];
  }

  interface ListMemberResponse {
    id: string;
    email_address: string;
    status: string;
    merge_fields: MergeFields;
    tags: string[];
  }

  interface ErrorResponse {
    status: number;
    response?: {
      body?: {
        title?: string;
        detail?: string;
      };
    };
  }

  interface Lists {
    addListMember(listId: string, body: ListMember): Promise<ListMemberResponse>;
    getListMember(listId: string, subscriberHash: string): Promise<ListMemberResponse>;
    updateListMember(
      listId: string,
      subscriberHash: string,
      body: Partial<ListMember>
    ): Promise<ListMemberResponse>;
  }

  interface Mailchimp {
    setConfig(config: Config): void;
    lists: Lists;
  }

  const mailchimp: Mailchimp;
  export default mailchimp;
}