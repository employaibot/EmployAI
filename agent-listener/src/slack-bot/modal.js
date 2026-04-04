// agent-listener/src/slack-bot/modal.js

/**
 * @param {{ lists: Array<{id: string, name: string}>, members: Array<{id: string, username: string, fullName: string}> }} board
 * @returns {object} Slack Block Kit modal view
 */
export function buildCreateModal({ lists, members }) {
  const blocks = [
    {
      type: 'input',
      block_id: 'title_block',
      label: { type: 'plain_text', text: 'Title' },
      element: {
        type: 'plain_text_input',
        action_id: 'title_input',
        placeholder: { type: 'plain_text', text: 'Card title' },
      },
    },
    {
      type: 'input',
      block_id: 'description_block',
      optional: true,
      label: { type: 'plain_text', text: 'Description' },
      element: {
        type: 'plain_text_input',
        action_id: 'description_input',
        multiline: true,
        placeholder: { type: 'plain_text', text: 'Optional description' },
      },
    },
    {
      type: 'input',
      block_id: 'list_block',
      label: { type: 'plain_text', text: 'List' },
      element: {
        type: 'static_select',
        action_id: 'list_select',
        placeholder: { type: 'plain_text', text: 'Select a list' },
        options: lists.map(l => ({
          text: { type: 'plain_text', text: l.name },
          value: l.id,
        })),
      },
    },
    {
      type: 'input',
      block_id: 'due_date_block',
      optional: true,
      label: { type: 'plain_text', text: 'Due Date' },
      element: {
        type: 'datepicker',
        action_id: 'due_date_picker',
        placeholder: { type: 'plain_text', text: 'Select a date' },
      },
    },
  ];

  if (members.length > 0) {
    blocks.push({
      type: 'input',
      block_id: 'assign_block',
      optional: true,
      label: { type: 'plain_text', text: 'Assign To' },
      element: {
        type: 'static_select',
        action_id: 'assign_select',
        placeholder: { type: 'plain_text', text: 'Select a member' },
        options: members.map(m => ({
          text: { type: 'plain_text', text: m.fullName || m.username },
          value: m.id,
        })),
      },
    });
  }

  return {
    type: 'modal',
    callback_id: 'trello_create_card',
    title: { type: 'plain_text', text: 'Create Trello Card' },
    submit: { type: 'plain_text', text: 'Create' },
    close: { type: 'plain_text', text: 'Cancel' },
    blocks,
  };
}
