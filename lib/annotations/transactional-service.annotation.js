"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactional = void 0;
const core_1 = require("@tsed/core");
const di_1 = require("@tsed/di");
const Transactional = (annotation = di_1.Service, ...args) => {
    return core_1.useDecorators(annotation(...args), di_1.Injectable({
        scope: di_1.ProviderScope.REQUEST
    }));
};
exports.Transactional = Transactional;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb25hbC1zZXJ2aWNlLmFubm90YXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYW5ub3RhdGlvbnMvdHJhbnNhY3Rpb25hbC1zZXJ2aWNlLmFubm90YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQTBDO0FBQzFDLGlDQUE2RDtBQUV0RCxNQUFNLGFBQWEsR0FBRyxDQUFDLGFBQStCLFlBQU8sRUFBRSxHQUFHLElBQVcsRUFBRSxFQUFFO0lBQ3RGLE9BQU8sb0JBQWEsQ0FDbEIsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQ25CLGVBQVUsQ0FBQztRQUNULEtBQUssRUFBRSxrQkFBYSxDQUFDLE9BQU87S0FDN0IsQ0FBQyxDQUNILENBQUE7QUFDSCxDQUFDLENBQUE7QUFQWSxRQUFBLGFBQWEsaUJBT3pCIn0=