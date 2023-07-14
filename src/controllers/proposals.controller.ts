import UploadFile from "@/helper/uploadFiles";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import Upload from "@/middlewares/upload";
import Attachment, { IAttachment } from "@/models/attatchment.model";
import Proposal, { IProposal } from "@/models/proposal.model";
import { sendApiResponse } from "@/utils/utils";
import { NextFunction, Request, Response } from "express";

// export const createProposal = catchAsyncErrors(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const {
//         job,
//         current_proposal_status,
//         freelancer_id,
//         payment_type_id,
//         payment_amount,
//       } = req.body;

//       // Create the proposal
//       const proposal: IProposal = await Proposal.create({
//         job,
//         freelancer_id,
//         proposal_time: new Date(),
//         payment_type_id,
//         payment_amount,
//         current_proposal_status, // Assuming 1 represents the initial status
//       });

//       sendApiResponse(res, "success", { proposal });
//     } catch (error) {
//       console.error(error);
//       sendApiResponse(res, "error", null, "Internal server error");
//     }
//   }
// );

export const createProposal = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    await Upload(req, res);

    console.log("request", req.files);

    const {
      job,
      current_proposal_status,
      freelancer_id,
      payment_type_id,
      payment_amount,
      cover_letter,
    } = req.body;

    // Create the proposal
    const proposal: IProposal = await Proposal.create({
      job,
      freelancer_id,
      proposal_time: new Date(),
      current_proposal_status,
      client_grade: null,
      client_comment: null,
      freelancer_grade: null,
      freelancer_comment: null,
      cover_letter,
    });

    // Handle file uploads
    // uploadFile.array("attachments", 10)(req, res, async (err: any) => {
    // if (err) {
    //   console.error(err);
    //   return res.status(400).json({ error: "Failed to upload attachments" });
    // }

    const attachments = req.files as Express.Multer.File[];

    // Save attachments to the database
    if (attachments && attachments.length > 0) {
      const attachmentPromises = attachments.map(
        (attachment: Express.Multer.File) => {
          const attachmentData: IAttachment = new Attachment({
            proposal_id: proposal._id,
            attachment_link: attachment.path,
          });
          return attachmentData.save();
        }
      );
      await Promise.all(attachmentPromises);
    }
    // }

    res.status(201).json({ proposal });

    // });
  }
);

export const getAllProposals = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const proposals: IProposal[] = await Proposal.find().exec();
      sendApiResponse(res, "success", { proposals });
    } catch (error) {
      console.error(error);
      sendApiResponse(res, "error", null, "Internal server error");
    }
  }
);

export const getProposalById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { proposalId } = req.params;
      const proposal: IProposal | null = await Proposal.findById(
        proposalId
      ).exec();

      if (!proposal) {
        sendApiResponse(res, "error", null, "Proposal not found");
      } else {
        sendApiResponse(res, "success", { proposal });
      }
    } catch (error) {
      console.error(error);
      sendApiResponse(res, "error", null, "Internal server error");
    }
  }
);

export const updateProposalById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { proposalId } = req.params;
      const updateData = req.body;

      const proposal: IProposal | null = await Proposal.findByIdAndUpdate(
        proposalId,
        updateData,
        { new: true }
      ).exec();

      if (!proposal) {
        sendApiResponse(res, "error", null, "Proposal not found");
      } else {
        sendApiResponse(res, "success", { proposal });
      }
    } catch (error) {
      console.error(error);
      sendApiResponse(res, "error", null, "Internal server error");
    }
  }
);

export const withdrawProposal = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { proposalId } = req.params;

      const proposal: IProposal | null = await Proposal.findByIdAndUpdate(
        proposalId,
        { current_proposal_status: 0 }, // Assuming 0 represents the withdrawn status
        { new: true }
      ).exec();

      if (!proposal) {
        sendApiResponse(res, "error", null, "Proposal not found");
      } else {
        sendApiResponse(res, "success", {
          message: "Proposal has been withdrawn successfully",
        });
      }
    } catch (error) {
      console.error(error);
      sendApiResponse(res, "error", null, "Internal server error");
    }
  }
);
