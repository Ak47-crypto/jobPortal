export interface ethersError extends Error {
    code: "UNKNOWN_ERROR" | "NOT_IMPLEMENTED" | "UNSUPPORTED_OPERATION" | "NETWORK_ERROR" | "SERVER_ERROR" | "TIMEOUT" | "BAD_DATA" | "CANCELLED" | "BUFFER_OVERRUN" | "NUMERIC_FAULT" | "INVALID_ARGUMENT" | "MISSING_ARGUMENT" | "UNEXPECTED_ARGUMENT" | "VALUE_MISMATCH" | "CALL_EXCEPTION" | "INSUFFICIENT_FUNDS" | "NONCE_EXPIRED" | "REPLACEMENT_UNDERPRICED" | "TRANSACTION_REPLACED" | "UNCONFIGURED_NAME" | "OFFCHAIN_FAULT" | "ACTION_REJECTED";
    info: Record< string, any >;
    shortMessage: string;
  }

export interface ActionRejectedError extends ethersError{
    action:"requestAccess" | "sendTransaction" | "signMessage" | "signTransaction" | "signTypedData" | "unknown";
    reason:"expired" | "rejected" | "pending"
}