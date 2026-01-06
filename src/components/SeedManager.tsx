'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface SeedResult {
  success: boolean;
  message: string;
  count?: number;
}

interface Stats {
  total: number;
  male: number;
  female: number;
}

export default function SeedManager() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SeedResult | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
      });
      
      const data = await response.json();
      setResult(data);
      
      if (data.success) {
        await fetchStats();
      }
    } catch {
      setResult({
        success: false,
        message: 'Network error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetVotes = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/seed?action=reset-votes', {
        method: 'POST',
      });
      
      const data = await response.json();
      setResult(data);
    } catch {
      setResult({
        success: false,
        message: 'Network error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/seed');
      const data = await response.json();
      
      if (data.success) {
        const male = data.data?.filter((s: {gender: string}) => s.gender === 'male').length || 0;
        const female = data.data?.filter((s: {gender: string}) => s.gender === 'female').length || 0;
        
        setStats({
          total: data.count || 0,
          male,
          female
        });
      }
    } catch {
      console.error('Failed to fetch stats');
    }
  };

  return (
    <div className="space-y-6">
      {stats && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-gray-500">Active selections</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Male Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.male}</div>
              <p className="text-xs text-gray-500">King competition</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Female Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-600">{stats.female}</div>
              <p className="text-xs text-gray-500">Queen competition</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Seed Database
              <Badge variant="destructive">Destructive</Badge>
            </CardTitle>
            <CardDescription>
              Replace all existing data with fresh selection data from JSON file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleSeed} 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Seeding Database...' : 'Seed Database'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Reset Votes
              <Badge variant="secondary">Safe</Badge>
            </CardTitle>
            <CardDescription>
              Clear all voting data while preserving candidate information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleResetVotes} 
              disabled={loading}
              className="w-full"
              variant="outline"
            >
              {loading ? 'Resetting Votes...' : 'Reset All Votes'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {result && (
        <Alert className={result.success ? 'border-green-500' : 'border-red-500'}>
          <AlertDescription className={result.success ? 'text-green-800' : 'text-red-800'}>
            <strong>{result.success ? 'Success:' : 'Error:'}</strong> {result.message}
            {result.count && (
              <Badge variant="outline" className="ml-2">
                {result.count} items processed
              </Badge>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}