const attachmentService = require('../services/attachment.service');

exports.createAttachment = async (req, res) => {
  try {
    const attachment = await attachmentService.createAttachment(req.body);
    res.status(201).json(attachment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload attachment' });
  }
};

exports.getAttachments = async (req, res) => {
  try {
    const { reference_id, reference_type } = req.query;

    const attachments =
      await attachmentService.getAttachmentsByReference(
        reference_id,
        reference_type
      );

    res.json(attachments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch attachments' });
  }
};

exports.getAttachmentByTicket = async (req, res) => {
  try {
    const attachment = await attachmentService.getAttachmentByTicket(
      req.params.ticketId
    );

    if (!attachment) {
      return res.status(404).json({ message: 'No attachment found' });
    }

    let base64Data = attachment.file_base64;

    // 🔥 Remove prefix if exists
    if (base64Data.startsWith('data:')) {
      base64Data = base64Data.split(',')[1];
    }

    const fileBuffer = Buffer.from(base64Data, 'base64');

    res.setHeader('Content-Type', attachment.file_type);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${attachment.file_name}"`
    );

    res.send(fileBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching attachment' });
  }
};