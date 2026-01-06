import { db } from '@/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  writeBatch,
  query,
  where 
} from 'firebase/firestore';
import selectionData from '@/app/data/selection.json';

export interface SeedResult {
  success: boolean;
  message: string;
  count?: number;
  data?: unknown[];
  error?: string;
}

export class SelectionSeeder {
  private static readonly COLLECTION_NAME = 'selections';

  static async clearCollection(): Promise<void> {
    const selectionsRef = collection(db, this.COLLECTION_NAME);
    const snapshot = await getDocs(selectionsRef);
    
    const batch = writeBatch(db);
    snapshot.docs.forEach((docSnapshot) => {
      batch.delete(doc(db, this.COLLECTION_NAME, docSnapshot.id));
    });
    
    await batch.commit();
  }

  static async seedSelections(): Promise<SeedResult> {
    try {
      // Clear existing data
      await this.clearCollection();

      const selectionsRef = collection(db, this.COLLECTION_NAME);
      const batch = writeBatch(db);
      const seededSelections = [];

      for (const selection of selectionData.selections) {
        const docRef = doc(selectionsRef);
        const selectionDoc = {
          name: selection.name,
          profile: selection.profile,
          age: selection.age,
          selection_no: selection.selection_no,
          gender: selection.gender,
          section: selection.section,
          address: selection.address,
          gallery: selection.gallery,
          kingVotes: [],
          queenVotes: [],
          popularVotes: [],
          innocentVotes: [],
          kingVotesCount: 0,
          queenVotesCount: 0,
          popularVotesCount: 0,
          innocentVotesCount: 0,
          isKing: false,
          isQueen: false,
          isPopular: false,
          isInnocent: false,
          selected: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        batch.set(docRef, selectionDoc);
        seededSelections.push({ id: docRef.id, ...selectionDoc });
      }

      await batch.commit();

      return {
        success: true,
        message: `Successfully seeded ${seededSelections.length} selections`,
        count: seededSelections.length,
        data: seededSelections
      };

    } catch (error) {
      return {
        success: false,
        message: 'Failed to seed selections',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static async getSelections(): Promise<SeedResult> {
    try {
      const selectionsRef = collection(db, this.COLLECTION_NAME);
      const snapshot = await getDocs(selectionsRef);
      
      const selections = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return {
        success: true,
        message: 'Selections fetched successfully',
        count: selections.length,
        data: selections
      };

    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch selections',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static async getSelectionsByGender(gender: 'male' | 'female'): Promise<SeedResult> {
    try {
      const selectionsRef = collection(db, this.COLLECTION_NAME);
      const q = query(selectionsRef, where('gender', '==', gender));
      const snapshot = await getDocs(q);
      
      const selections = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return {
        success: true,
        message: `${gender} selections fetched successfully`,
        count: selections.length,
        data: selections
      };

    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${gender} selections`,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static async resetVotes(): Promise<SeedResult> {
    try {
      const selectionsRef = collection(db, this.COLLECTION_NAME);
      const snapshot = await getDocs(selectionsRef);
      
      const batch = writeBatch(db);
      
      snapshot.docs.forEach((docSnapshot) => {
        const docRef = doc(db, this.COLLECTION_NAME, docSnapshot.id);
        batch.update(docRef, {
          kingVotes: [],
          queenVotes: [],
          popularVotes: [],
          innocentVotes: [],
          kingVotesCount: 0,
          queenVotesCount: 0,
          popularVotesCount: 0,
          innocentVotesCount: 0,
          isKing: false,
          isQueen: false,
          isPopular: false,
          isInnocent: false,
          updatedAt: new Date()
        });
      });
      
      await batch.commit();

      return {
        success: true,
        message: 'All votes reset successfully',
        count: snapshot.docs.length
      };

    } catch (error) {
      return {
        success: false,
        message: 'Failed to reset votes',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}